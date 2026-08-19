import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  
  // Clean up
  await prisma.auditLog.deleteMany()
  await prisma.complaint.deleteMany()
  await prisma.bottleneck.deleteMany()
  await prisma.document.deleteMany()
  await prisma.cargoPassport.deleteMany()
  await prisma.temperatureEvent.deleteMany()
  await prisma.locationEvent.deleteMany()
  await prisma.shipmentStop.deleteMany()
  await prisma.checkpoint.deleteMany()
  await prisma.route.deleteMany()
  await prisma.cargo.deleteMany()
  await prisma.shipment.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.driverProfile.deleteMany()
  await prisma.user.deleteMany()
  await prisma.organization.deleteMany()

  // Organizations
  const govOrg = await prisma.organization.create({ data: { name: 'Ministry of Transport', type: 'GOV' } })
  const portOrg = await prisma.organization.create({ data: { name: 'Aktau Sea Port', type: 'PORT' } })
  const logisticsOrg = await prisma.organization.create({ data: { name: 'Caspian Logistics LLC', type: 'LOGISTICS' } })
  
  // Users
  const admin = await prisma.user.create({
    data: { email: 'admin@caspian.os', passwordHash: 'hashedpassword', name: 'System Admin', role: 'ADMIN', organizationId: govOrg.id }
  })
  const govUser = await prisma.user.create({
    data: { email: 'gov@caspian.os', passwordHash: 'hashedpassword', name: 'Strategic Operator', role: 'GOVERNMENT', organizationId: govOrg.id }
  })
  const portOperator = await prisma.user.create({
    data: { email: 'port@caspian.os', passwordHash: 'hashedpassword', name: 'Port Manager', role: 'PORT_OPERATOR', organizationId: portOrg.id }
  })
  const driverUser = await prisma.user.create({
    data: { email: 'driver@caspian.os', passwordHash: 'hashedpassword', name: 'Azamat K.', role: 'DRIVER', organizationId: logisticsOrg.id }
  })
  
  const driverProfile = await prisma.driverProfile.create({
    data: { userId: driverUser.id, licenseNumber: 'KZ-938210', status: 'AVAILABLE' }
  })

  // Vehicle
  const truck = await prisma.vehicle.create({
    data: { plateNumber: 'KZ 123 ABC 12', type: 'TRUCK_REFRIGERATED', capacity: 20000, organizationId: logisticsOrg.id }
  })

  // Route
  const route = await prisma.route.create({
    data: { name: 'Aktau - Atyrau', origin: 'Aktau', destination: 'Atyrau' }
  })

  // Shipment & Cargo
  const shipment = await prisma.shipment.create({
    data: {
      vehicleId: truck.id,
      driverId: driverProfile.id,
      status: 'ON_ROUTE',
      currentLat: 43.6481,
      currentLng: 51.1706, // Aktau area
      routeId: route.id,
      predictedEta: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      etaConfidence: 0.87
    }
  })

  const cargo = await prisma.cargo.create({
    data: {
      description: '1,200 kg refrigerated fish',
      weight: 1200,
      type: 'REFRIGERATED',
      origin: 'Aktau',
      destination: 'Atyrau',
      status: 'IN_TRANSIT',
      shipmentId: shipment.id
    }
  })

  // Cargo Passport
  await prisma.cargoPassport.create({
    data: {
      cargoId: cargo.id,
      qrCodeUrl: `/track/${cargo.id}`,
      lastVerifiedAt: new Date(),
      chainOfCustody: JSON.stringify([{ action: 'LOADED', location: 'Aktau', timestamp: new Date() }])
    }
  })

  // Bottleneck Scenario
  await prisma.bottleneck.create({
    data: {
      locationName: 'Aktau -> Beyneu Corridor',
      lat: 43.8,
      lng: 51.3,
      severity: 'RED',
      averageDelayMins: 252, // 4.2 hours
      affectedShipments: 47,
      economicImpact: 18400000,
      rootCause: 'Vessel loading capacity / Rail synchronization',
      confidence: 0.82,
      predictedEscalation: new Date(Date.now() + 3.3 * 60 * 60 * 1000), // 3h 20m
      isActive: true
    }
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
